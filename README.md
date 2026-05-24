# Daily Journal API

A simple Django REST Framework API for managing daily journal entries.

## Live URL
https://daily-journal-api-zpnp.onrender.com

## Features
- Add a journal entry (POST)
- Get all journal entries (GET)

## Tech Stack
- Python
- Django
- Django REST Framework
- Gunicorn
- Render (Deployment)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/entries/ | Get all journal entries |
| POST | /api/entries/add/ | Create a new journal entry |

## Sample POST Request
```json
{
    "title": "My Day",
    "content": "Today was a great day!"
}
```

## Installation
```bash
git clone https://github.com/subhikshyashrestha/daily_journal_api.git
cd daily_journal_api
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
