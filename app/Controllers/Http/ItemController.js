"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Item = use("App/Models/Item");

/**
 * Resourceful controller for interacting with items
 */
class ItemController {
  /**
   * Show a list of all items.
   * GET items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const items = await Item.query().fetch();
    return items;
  }

  /**
   * Create/save a new item.
   * POST items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["name"]);
    const item = await Item.create(data);
    return item;
  }

  /**
   * Delete a item with id.
   * DELETE items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const item = await Item.findOrFail(id);
    await item.delete();
    return item;
  }
}

module.exports = ItemController;
