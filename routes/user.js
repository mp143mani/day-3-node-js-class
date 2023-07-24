const express = require('express')
const router = express.Router()
const { mongodb, dbname, dbUrl } = require('../config/dbConfig')

const MongoClient = mongodb.MongoClient
const client = new MongoClient(dbUrl)

router.get('/', async (req, res) => {
    await client.connect()
    try {
        let db = await client.db(dbname)
        let data = await db.collection('users').find().toArray()

        res
            .status(200)
            .send({
                message: "Data Fetched successfully",
                data
            })
    } catch (error) {
        res.status(500)
            .send({
                message: "Internal Server Error fetching",

            })
    }
    finally {

    }
})

router.get('/:id', async (req, res) => {
    await client.connect()
    try {
        let db = await client.db(dbname)
        let data = await db.collection('users').findOne({ _id: new mongodb.ObjectId(req.params.id) })
        if (data) {
            res
                .status(200)
                .send({
                    message: "Data Fetched successfully",
                    data
                })
        }
        else {
            res
                .status(400)
                .send({ module: "Invalid ID" })
        }
    } catch (error) {
        res.status(500)
            .send({
                message: "Internal Server Error fetching",

            })
    }
    finally {

    }
})

router.put('/:id', async (req, res) => {
    await client.connect()
    try {
        let db = await client.db(dbname)
        let data = await db.collection('users').updateOne({ _id: new mongodb.ObjectId(req.params.id)}, {$set:req.body})
    
            res
                .status(200)
                .send({
                    message: "Data Updated successfully"
                })
        
        
    } catch (error) {
        res.status(500)
            .send({
                message: "Internal Server Error fetching",

            })
    }
    finally {
      client.close()
    }
})

router.delete('/:id', async (req, res) => {
    await client.connect()
    try {
        let db = await client.db(dbname)
        let data = await db.collection('users').deleteOne({ _id: new mongodb.ObjectId(req.params.id)})
    
            res
                .status(200)
                .send({
                    message: "User Data Delete successfully"
                })
        
        
    } catch (error) {
        res.status(500)
            .send({
                message: "Internal Server Error fetching",

            })
    }
    finally {

    }
})

router.post('/', async (req, res) => {
    await client.connect()
    try {
        let db = await client.db(dbname)
        let data = await db.collection('users').insertOne(req.body)

        res
            .status(200)
            .send({
                message: "Data Saved successfully",
                data
            })
    } catch (error) {
        res.status(500)
            .send({
                message: "Internal Server Error fetching",

            })
    }
    finally {

    }
})

module.exports = router