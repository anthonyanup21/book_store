⚙️ Installation & Setup                                         
1️⃣ Clone Repository                                 
git clone <your-repo-url>                           
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
