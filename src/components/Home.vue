<template>
  <div>
    <section v-if="posts">
      <ul>
        <li v-for="post in posts" :key="post.id">
          <router-link :to="`/post/${post.id}`" class="link">
            <div class="placeholder">
              <img
                :alt="post.title"
                :src="`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${post.coverImage.handle}`"
              />
            </div>
            <h3>{{post.title}}</h3>
          </router-link>
        </li>
      </ul>
      <button v-if="postCount && postCount > posts.length" @click="loadMorePosts">
        {{loading ? 'Loading...' : 'Show more'}}
      </button>
    </section>
    <h2 v-else>
      Loading...
    </h2>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  ​
  const POSTS_PER_PAGE = 2
​
  const posts = gql`
    query posts($first: Int!, $skip: Int!) {
      posts(orderBy: dateAndTime_DESC, first: $first, skip: $skip) {
        id
        slug
        title
        dateAndTime
        coverImage {
          handle
        }
      }
    }
  `
​
  export default {
    name: 'HomePage',
    data: () => ({
      loading: 0,
      posts: null,
      postCount: null
    }),
    apollo: {
      $loadingKey: 'loading',
      posts: {
        query: posts,
        variables: {
          skip: 0,
          first: POSTS_PER_PAGE
        }
      },
      postCount: {
        query: gql`{ postsConnection { aggregate { count } } }`,
        update: ({postsConnection}) => postsConnection.aggregate.count
      }
    },
    methods: {
      loadMorePosts() {
        this.$apollo.queries.posts.fetchMore({
          variables: {
            skip: this.posts.length
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return Object.assign({}, previousResult, {
              posts: [...previousResult.posts, ...fetchMoreResult.posts]
            })
          }
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
  }
  main {
    max-width: 650px;
    margin: 32px auto;
    padding: 0 24px;
  }
  a {
    color: deepskyblue;
    text-decoration: none;
  }
  article {
    margin: 0 auto;
    max-width: 650px;
  }
</style>
