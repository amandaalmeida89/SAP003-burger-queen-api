import database from '../src/models'

class OrderItemService {
  static async getAllOrderItems() {
    try {
      return await database.OrderItem.findAll()
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  static async addOrderItem(newOrderItem) {
    try {
      return database.OrderItem.create(
        newOrderItem
      );
    } catch (error) {
      throw error
    }
  }

  static async updateOrderItem(id, updateOrderItem) {
    try {
      const OrderItemToUpdate = await database.OrderItem.findOne({
        where: { id: Number(id) }
      })

      if (OrderItemToUpdate) {
        await database.OrderItem.update(updateOrderItem, { where: { id: Number(id) } })

        return updateOrderItem
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getOrderItem(id) {
    try {
      const theOrderItem = await database.OrderItem.findOne({
        where: { id: Number(id) }
      })

      return theOrderItem
    } catch (error) {
      throw error
    }
  }

  static async deleteOrderItem(id) {
    try {
      const OrderItemToDelete = await database.OrderItem.findOne({ where: { id: Number(id) } })

      if (OrderItemToDelete) {
        const deletedOrderItem = await database.OrderItem.destroy({
          where: { id: Number(id) }
        })
        return deletedOrderItem
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default OrderItemService