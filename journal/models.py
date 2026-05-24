from django.db import models

class JournalEntry(models.Model):
    MOOD_CHOICES = [
        ('happy', 'Happy'),
        ('sad', 'Sad'),
        ('productive', 'Productive'),
    ]
    title = models.CharField(max_length=200)
    content = models.TextField()
    mood = models.CharField(max_length=20, choices=MOOD_CHOICES, default='happy')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title