from django.urls import path
from .views import RegisterView, LoginView, TaskListCreateView, TaskDetailView, ProfileView, AboutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('tasks/', TaskListCreateView.as_view(), name='tasks'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('profiles/', ProfileView.as_view(), name='profiles'),
    path('login/', LoginView.as_view(), name='login'),
    path('about/', AboutView.as_view(), name='about'),
]