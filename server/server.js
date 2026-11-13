import express from "express";


const app = express();
const PORT = 4000;


app.get("/", (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: "Olison API is Running!",
    })

});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// if (process.env.NODE_ENV !== 'production') {
// }


export default app;