const listHelper = require('../utils/list_helper')
describe('dummy test', () => {
  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listOfOneBlog = [
    { title: "Title", author: "Author", url: "url", likes: 5}
  ]
  const listOfThreeBlogs = [
    {
      title: "Title1",
      author: "Author1",
      url: "url1",
      likes: 0
    },
    {
      title: "Title2",
      author: "Author2",
      url: "url2",
      likes: 8
    },
    {
      title: "Title3",
      author: "Author3",
      url: "url3",
      likes: 7
    }
  ]

  test('of an empty list is zero', () => {    
    expect(listHelper.totalLikes([])).toBe(0)
  })
  
  test('is correct when there is only one blog on the list', () => {
    expect(listHelper.totalLikes(listOfOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listOfThreeBlogs)).toBe(15)
  })

})

describe('favorite blog', () => {
  const listOfOneBlog = [
    { title: "Title", author: "Author", url: "url", likes: 5}
  ]
  const listOfThreeBlogs = [
    {
      title: "Title1",
      author: "Author1",
      url: "url1",
      likes: 0
    },
    {
      title: "Title2",
      author: "Author2",
      url: "url2",
      likes: 8
    },
    {
      title: "Title3",
      author: "Author3",
      url: "url3",
      likes: 7
    }
  ]
  const listOfThreeBlogsWithTwoSame = [
    {
      title: "Title1",
      author: "Author1",
      url: "url1",
      likes: 8
    },
    {
      title: "Title2",
      author: "Author2",
      url: "url2",
      likes: 8
    },
    {
      title: "Title3",
      author: "Author3",
      url: "url3",
      likes: 7
    }
  ]
  test('returns empty object when no blogs are given', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when given only one blog, returns that', () => {
    const expected = { title: "Title", author: "Author", url: "url", likes: 5}
    expect(listHelper.favoriteBlog(listOfOneBlog)).toEqual(expected)
  })

  test('returns a blog with most likes', () => {
    const expected = {title: "Title2",
    author: "Author2",
    url: "url2",
    likes: 8}
    expect(listHelper.favoriteBlog(listOfThreeBlogs)).toEqual(expected)
  })

  test('returns any blog with the highest likes', () => {
    expect(listHelper.favoriteBlog(listOfThreeBlogsWithTwoSame).likes).toBe(8)
  })
})
