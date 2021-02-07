<template>
  <div class="picture">
    <header class="picture-head">
      <span class="title title-yellow">P</span>
      <span class="title title-blue">i</span>
      <span class="title title-red">c</span>
      <span class="title title-yellow">t</span>
      <span class="title title-blue">u</span>
      <span class="title title-green">r</span>
      <span class="title title-red">e</span>
      <span class="title title-yellow">W</span>
      <span class="title title-blue">a</span>
      <span class="title title-yellow">l</span>
      <span class="title title-blue">l</span>
    </header>

    <main class="picture-main">
      <div
        v-for="pictureData in picturesData"
        :key="pictureData.id"
        class="picture-item" >
          <a :href="pictureData.imgurl" target="_blank">
            <img :src="pictureData.imgurl" alt="picture">
          </a>
        <div class="picture-desc">
          <span>{{pictureData.desc}}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import { getPicture } from 'network/picture'

  export default {
    name: 'Picture',

    data() {
      return {
        picturesData: []
      }
    },

    created() {
      this._getPicture()
    },

    methods: {
      _getPicture() {
        getPicture().then(res => {
          let { results } = res.data
          this.picturesData = results
        })
      }
    }
  }
</script>

<style scoped>
  .picture {
    margin: auto;
    height: 100%;
    overflow: auto;
  }

  .picture-head {
    text-align: center;
    margin: 30px;
  }

  .title {
    font-size: 3em;
    font-weight: bold;
  }

  .title-blue {
    color: #4285F4;
  }

  .title-red {
    color: #E84235;
  }

  .title-yellow {
    color: #FABB06;
  }

  .title-green {
    color: #34A853;
  }

  .picture-main {
    max-width: 100%;
    flex-wrap: wrap;
    display: inline-flex;
    justify-content: center;
  }

  .picture-item {
    padding: 4px 6px;
    /* position: relative; */
  }

  .picture-item img {
    /* max-width: 100%; */
    border-radius: 5px;
    transition: .25s;
    width: 300px;
    object-fit: cover;
  }

  .picture-desc {
    /* position: absolute;
    bottom: 10px;
    color: #fff;
    opacity: 0;
    font-size: 16px; */
    padding: 3px;
  }

  .picture-item img:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, .8)
  }

  .picture-item img:hover + .picture-desc {
    opacity: 1;
  }
</style>