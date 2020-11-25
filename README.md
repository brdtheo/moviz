# Moviz

### What is Moviz ? 
Moviz is the attempt to make an ultralight version of IMDB in one month. Even if this app is **far** from production ready, i wanted to give it a try. Stack is the following:

###### Main
- Vue
- Vuetify for material design
- Google Firebase

###### Libraries/Plugins
- i18n
- Video.js

## Features
- User login system (Firebase Auth)
- Write and manage reviews
- Add movies in the app using the admin form

The app also has a small role system where moderators can restrict reviews, admins can add movies and superadmins can add/remove roles and ban users.

## Issues & performance
I'm aware that this project has several problems. First of all the performance is not good at all due to unused CSS from Vuetify, component code that is not optimized and also some features are not even finished yet (e.g. full text search that partially works).