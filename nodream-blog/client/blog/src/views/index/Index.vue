<template>
  <div class="index">
    <div class="container">
      <div class="info">
        <h2>No-Dream Blog</h2>
        <div class="links">
          <div>
            <img src="~assets/img/index/blog.svg" />
            <router-link to="/posts/1">Blog</router-link>
          </div>
          <div>
            <img src="~assets/img/index/gitHub.svg" />
            <a href="https://github.com/Leftke">Github</a>
          </div>
          <div>
            <img src="~assets/img/index/music.svg" />
            <a href="https://music.163.com/#/user/home?id=275978578">Music</a>
          </div>
          <div>
            <img src="~assets/img/index/bilibili.svg" />
            <a href="https://space.bilibili.com/90174223">BiliBili</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index'
  }
</script>

<style scoped>
  .container {
    height: 100vh;
    background: -webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .container img {
    transition: all .3s;
  }

  .container img:hover {
    transform: scale(1.2);
  }

  .info {
    padding: 1em;
    position: absolute;
    left: 50%;
    top: 40%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transform: translate(-50%, -50%);
  }

  .info h2 {
    font-size: 30px;
    text-align: center;
    color: #ffffff;
    text-shadow: 2px 8px 2px #83ACDB;
  }

  .links {
    display: flex;
  }

  .links div {
    margin: 0 .7em;
    text-align: center;
  }

  .links img {
    width: 2em;
    height: 2em;
  }

  .links a {
    margin-top: .4em;
    display: block;
    text-decoration: none;
    color: #ffffff;
  }

  .links a:hover {
    color: #000000;
  }

  @media (max-width: 1024px) {
    .info {
      padding: 1em;
      position: absolute;
      left: 50%;
      top: 40%;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      transform: translate(-50%, -50%);
    }

    .info h2 {
      text-align: center;
      color: #ffffff;
    }

    .links {
      display: flex;
    }

    .links div {
      margin: 0 .7em;
      text-align: center;
    }

    .links img {
      width: 2em;
      height: 2em;
    }

    .links a {
      margin-top: .4em;
      display: block;
      text-decoration: none;
      color: #ffffff;
    }
  }
  
  @media (max-width: 767px) {
    .info {
      padding: 1em;
      position: absolute;
      left: 50%;
      top: 40%;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      transform: translate(-50%, -50%);
    }

    .info h2 {
      text-align: center;
      color: #ffffff;
    }

    .links {
      display: flex;
    }

    .links div {
      margin: 0 .7em;
      text-align: center;
    }

    .links img {
      width: 2em;
      height: 2em;
    }

    .links a {
      margin-top: .4em;
      display: block;
      text-decoration: none;
      color: #ffffff;
    }
  }
</style>