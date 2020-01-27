import database from '../src/models'

class OrderService {
  static async getAllOrders() {
    try {
      return await database.Order.findAll({
        include: [
          { model: database.Table, as: 'table' },
          { model: database.Product, as: 'products', duplicating: true }
        ],
      })
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  static async addOrder(newOrder) {
    try {
      const order = await database.Order.create({ table_id: newOrder.table_id });
      await order.addProducts(newOrder.products);
    } catch (error) {
      throw error
    }
  }

  static async updateOrder(id, updateOrder) {
    try {
      const OrderToUpdate = await database.Order.findOne({
        where: { id: Number(id) }
      })

      if (OrderToUpdate) {
        await database.Order.update(updateOrder, { where: { id: Number(id) } })

        return updateOrder
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getOrder(id) {
    try {
      const theOrder = await database.Order.findOne({
        where: { id: Number(id) }
      })

      return theOrder
    } catch (error) {
      throw error
    }
  }

  static async deleteOrder(id) {
    try {
      const OrderToDelete = await database.Order.findOne({ where: { id: Number(id) } })

      if (OrderToDelete) {
        const deletedOrder = await database.Order.destroy({
          where: { id: Number(id) }
        })
        return deletedOrder
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default OrderService