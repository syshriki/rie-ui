import request from 'superagent'

const baseUrl = process.env.API_URL

export async function findRecipes (query, cursor) {
  const { body } = await request.get(`${baseUrl}/recipes`)
    .query({
      q: query,
      cursor
    })
    .set('Authorization', window.localStorage.getItem('username'))

  return body
}

export async function fetchRecipe (recipeSlug) {
  const { body } = await request.get(`${baseUrl}/recipes/${recipeSlug}`)
    .set('Authorization', window.localStorage.getItem('username'))

  return body
}

export async function createRecipe (recipe) {
  const { text } = await request.post(`${baseUrl}/recipes`)
    .send(recipe)
    .set('Authorization', window.localStorage.getItem('username'))

  return text
}

export async function updateRecipe (recipe) {
  const { text } = await request.put(`${baseUrl}/recipes`)
    .send(recipe)
    .set('Authorization', window.localStorage.getItem('username'))

  return text
}

export async function deleteRecipe (recipeSlug) {
  const { body } = await request.delete(`${baseUrl}/recipes/${recipeSlug}`)
    .set('Authorization', window.localStorage.getItem('username'))

  return body
}

export async function toggleFavorite (recipeSlug) {
  const { text } = await request.post(`${baseUrl}/recipes/${recipeSlug}/favorite`)
    .set('Authorization', window.localStorage.getItem('username'))

  return text
}

export async function fetchNews (cursor) {
  const { body } = await request.get(`${baseUrl}/news`)
    .query({ cursor })
    .set('Authorization', window.localStorage.getItem('username'))

  return body
}

export async function fetchNewsNoCursor () {
  const { body } = await request.get(`${baseUrl}/news`)
    .set('Authorization', window.localStorage.getItem('username'))

  return body
}

export async function checkUserExists (username) {
  const { body } = await request.get(`${baseUrl}/user/check`)
    .set('Authorization', username)

  return body
}
