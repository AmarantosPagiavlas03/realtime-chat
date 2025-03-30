
run: run-android run-ios

run-android:
	cd app && npm run android

run-ios:
	cd app && npm run ios -- --simulator='iPhone 14 Pro Max'

server:
	cd api && python manage.py runserver

env:
	.\venv\Scripts\Activate.ps1 

redis:
	redis-server