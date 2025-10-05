⚙️ Installation & Setup                                         
1️⃣ Clone Repository                                 
git clone https://github.com/anthonyanup21/book_store.git                          
cd interview-assignment-1                                                       

2️⃣ Backend Setup
cd backend                                                                                  
npm install                                


Create a .env file:

PORT=3000                               
MONGO_URI=your_mongodb_atlas_url                           
JWT_SECRET=your_secret_key                                      
ENV=development                             


Run backend:                                                     

npm start                         

3️⃣ Frontend Setup                   
cd ../frontend

in src/axios/axiosInstance.js  change BASEURL to "http://localhost:3000/api"

npm install                                            
npm run dev                                                         


API Endpoints

🔐 Auth

POST /api/auth/signup → Register new user

POST /api/auth/login → Login user

GET /api/auth/check-auth → Check if the user is authanticated

GET /api/auth/logout → Logout

📚 Books

POST /api/book/create-book → Add book (auth required)

GET /api/book/all-books → get all books

GET /api/book/get-created-books → get only books which i have created

DELETE /api/book/delete-book/:id→ Delete book (owner only)

PUT /api/book/update-book/:id→ Update book (owner only)

GET /api/book/search→ search for a specific book

⭐ Reviews

GET /api/review/all-reviews/:id → GET all the reviews of the specific book

GET /api/review/get-posted-reviews → GET all the reviews which i have posted 

POST /api/review//post-review/:id → Post a review for a specific book

PUT /api/reviews/update-review/:id→ Edit review of a specific book (owner only)

DELETE /api/reviews/delete-review/:id → Delete review of a specific book (owner only)


