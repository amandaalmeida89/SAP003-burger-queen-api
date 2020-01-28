import database from '../src/models'

class OrderService {
  static async getAllOrders() {
    try {
      return await database.Order.findAll({
        include: [
          { model: database.Table, as: 'table' },
          { model: database.OrderItem, as: 'items', include: [
            { model: database.Product, as: 'product' }
          ] }
        ],
      })
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  static async addOrder(newOrder) {
    try {
      return database.Order.create(
        newOrder, 
        {
          include: [{ model: database.OrderItem, as: 'items'}]
        }
      );
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