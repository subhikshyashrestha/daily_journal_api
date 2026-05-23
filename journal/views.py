from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import JournalEntry
from .serializers import JournalEntrySerializer

@api_view(['GET'])
def get_entries(request):
    entries = JournalEntry.objects.all().order_by('-created_at')
    serializer = JournalEntrySerializer(entries, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def post_entry(request):
    serializer = JournalEntrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)