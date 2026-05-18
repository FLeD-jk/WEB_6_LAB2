from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['user']

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Profile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    gender = serializers.CharField(write_only=True)
    birth_date = serializers.DateField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'gender', 'birth_date']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        gender = validated_data.pop('gender')
        birth_date = validated_data.pop('birth_date')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        Profile.objects.create(
            user=user,
            gender=gender,
            birth_date=birth_date
        )

        return user

