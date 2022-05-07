const db = require('../../data/db-config');

module.exports = {
  get,
  getPostsById,
  insertPost,
  updatePosts,
  remove,
};

function get() {
  return db('posts');
}

function getPostsById(id) {
  return db('posts')
    .where({ id })
    .first();
}

function insertPost(post) {
  return db('posts')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function updatePosts(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
