# WIP!
The app is a Work in Progress! 
It still needs work on both front and back end.

# 🐈🐈‍⬛ romina-server
Backend for Romina app. Node.js (Express) &amp; PostgreSQL - CRUD Rest APIs with Sequelize

## 📝 App overview
This app is build with the goal of helping me with scheduling a proper day-care for my kitties, when I am not at home for multiple days. When I am on holiday, I want to make sure that my cats, Romeo and Nina, will be well taken care of. I am lucky enough to have several friends that love my kitties, and that enjoy spending time with them. Through this app, I want to build a simple system to track which of my friends is available on which day and time slot, so that I can have a quick and snappy overview of when my cats won't have any of my friends available to take care of them, which will mean that on those days and times I will have to make sure to book a cat-sitter.

## 💽 DB tables

**trips**
- id: ID!
- name: String
- confirmed: Boolean 
- createdAt: Date
- updatedAt: Date
- [days] <-> days (1 to many)

**days**
- id: ID!
- date: Date
- tripId
- createdAt: Date
- updatedAt: Date
- [slots] <-> slots (1 to many)

**carers**
- id: ID!
- name: String
- phone: String
- email: String
- professional: Boolean
- createdAt: Date
- updatedAt: Date
- [slots] <-> slots (1 to many)

**slots**
- id: ID!
- timeframe: ENUM (either string ”morning”, ”afternoon”, ”evening”, ”overnight”, or ”general/unknown”)
- stayType: ENUM (“quick check”, “extended stay”)
- notes: String
- carerId 
- dayId
- createdAt: Date
- updatedAt: Date

**tasks**
- id: ID!
- type: String (water plants, exchange keys, wait for package, etc)
- createdAt: Date
- updatedAt: Date

**tasksSlots**
- id: ID!
- taskId: ID 
- slotId: ID
- createdAt: Date
- updatedAt: Date


# 🛫 Start the project
Yarn the project and start it with `yarn start`.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.


