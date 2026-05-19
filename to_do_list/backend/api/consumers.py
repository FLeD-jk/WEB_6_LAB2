import json
from urllib.parse import parse_qs
from channels.generic.websocket import AsyncWebsocketConsumer

ONLINE_USERS = {}


class TaskConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.group_name = "tasks"

        query_string = self.scope.get("query_string", b"").decode()
        query_params = parse_qs(self.scope["query_string"].decode())
        email = query_params.get("email", [None])[0]

        if not email:
            email = "anonymous"

        ONLINE_USERS[self.channel_name] = email

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

        await self.broadcast_online()

    async def disconnect(self, close_code):
        ONLINE_USERS.pop(self.channel_name, None)

        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

        await self.broadcast_online()

    async def receive(self, text_data):
        data = json.loads(text_data)

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "task_event",
                "payload": data
            }
        )

    async def task_event(self, event):
        await self.send(text_data=json.dumps({
            "type": "task",
            "data": event["payload"]
        }))

    async def broadcast_online(self):
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "online_users",
                "users": list(ONLINE_USERS.values()),
                "count": len(ONLINE_USERS)
            }
        )

    async def online_users(self, event):
        await self.send(text_data=json.dumps({
            "type": "online",
            "users": event["users"],
            "count": event["count"]
        }))
