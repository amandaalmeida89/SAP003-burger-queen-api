import express from 'express'
import bodyParser from 'body-parser'
import ProductRoutes from './server/routes/ProductRoutes';
import TableRoutes from './server/routes/TableRoutes';
import OrderRoutes from './server/routes/OrderRoutes';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use('/api/products', ProductRoutes);
app.use('/api/tables', TableRoutes);
app.use('/api/orders', OrderRoutes);


// quando recebe uma rota não listada
app.get('*', (req, res) => res.status(200).send({
  message: 'Boas-vindas à API Burger Quenn!',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

module.exports = app