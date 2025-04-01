const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4001



app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6plf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// const uri = `mongodb+srv://Game_Spot:61yUOHfZds2LO4i5@cluster0.6plf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const MyReviewsCollention = client.db('Game_Spot').collection('MyReviews')
        const WatchListCollention = client.db('Game_Spot').collection('WatchList')
        const blogsCollention = client.db('Game_Spot').collection('blogs')
        const BannersCollention = client.db('Game_Spot').collection('banner')








        // MyReviewsCollention Post

        app.post('/MyReviews', async (req, res) => {
            const data = req.body
            const result = await MyReviewsCollention.insertOne(data)
            res.send(result)
        })

        app.get('/MyReviews', async (req, res) => {

            const result = await MyReviewsCollention.find().toArray()

            res.send(result)

        })

        app.get('/AllReviews', async (req, res) => {
            const result = await MyReviewsCollention.find().toArray()

            res.send(result)

        })


        app.get('/HightReview', async (req, res) => {
            const result = await MyReviewsCollention.find().toArray()
            const sortData = result.sort((a, b) => b.rating - a.rating)
            const data = sortData.slice(0, 6)
            res.send(data)

        })


        app.delete('/MyReviews/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const queary = { _id: new ObjectId(id) }
            const result = await MyReviewsCollention.deleteOne(queary)
            res.send(result)
        })

        // my car update

        app.put("/MyReviews/:id", async (req, res) => {
            const { id } = req.params;
            const updateData = req.body;
            try {
                const result = await Car.updateOne({ _id: id }, { $set: updateData });
                if (result.modifiedCount === 0) {
                    return res.status(404).json({ message: "Car not found or no changes made" });
                }
                res.json({ message: "Car updated successfully" });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });


        //  WatchListCollention
        app.post('/WatchList', async (req, res) => {
            const data = req.body
            const result = await WatchListCollention.insertOne(data)
            res.send(result)
        })


        app.get('/WatchList', async (req, res) => {
            const result = await WatchListCollention.find().toArray()
            // const sortData = result.sort((a, b) => b.Daily_Rental_Price - a.Daily_Rental_Price)
            res.send(result)

        })


        app.delete('/WatchList/:id', async (req, res) => {
            const id = req.params.id
            //  console.log(id)
            const queary = { _id: new ObjectId(id) }
            const result = await WatchListCollention.deleteOne(queary)
            res.send(result)
        })


        // blogsCollention
        app.get('/blogs', async (req, res) => {
            const result = await blogsCollention.find().toArray()
            // const sortData = result.sort((a, b) => b.Daily_Rental_Price - a.Daily_Rental_Price)
            res.send(result)

        })


        app.get('/Banners', async (req, res) => {
            const result = await BannersCollention.find().toArray()
            // const sortData = result.sort((a, b) => b.Daily_Rental_Price - a.Daily_Rental_Price)
            res.send(result)

        })





        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);











app.get('/', (req, res) => {
    res.send('Game_Spot is starting')
})
app.listen(port, () => {
    console.log(`Game_Spot is sitting on ${port}`);

})