const axios = require("axios");

const author = {
  name: "German",
  lastname: "Rodriguez",
};

const searchItems = async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    );

    const categories = response.data.filters.map(
      (filter) => filter.values[0].name
    );
    const items = response.data.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 0,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    const result = {
      author,
      categories,
      items,
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar productos" });
  }
};

const getItemDetails = async (req, res) => {
  try {
    const itemId = req.params.id;
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${itemId}`),
      axios.get(`https://api.mercadolibre.com/items/${itemId}/description`),
    ]);

    const item = {
      id: itemResponse.data.id,
      title: itemResponse.data.title,
      price: {
        currency: itemResponse.data.currency_id,
        amount: itemResponse.data.price,
        decimals: 0,
      },
      picture: itemResponse.data.pictures[0].url,
      condition: itemResponse.data.condition,
      free_shipping: itemResponse.data.shipping.free_shipping,
      sold_quantity: itemResponse.data.sold_quantity || 1,
      description: descriptionResponse.data.plain_text,
    };

    const result = {
      author,
      item,
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener detalles del producto" });
  }
};

module.exports = {
  searchItems,
  getItemDetails,
};
