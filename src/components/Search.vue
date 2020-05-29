<template>
  <div class="search">
    <input v-focus ref="searchInput" v-on:input="searchTerm = $event.target.value" placeholder="Search" @blur="clearSearchInput()">
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Search',
  data() {
    return {
        searchTerm: '',
    }
  },
  watch: {
      searchTerm: _.debounce(function () {
          this.search();
      }, 300)
  },
  methods: {
    clearSearchInput() {
        _.delay(() => {
            this.searchTerm = '';
        }, 200);
    },
    search() {
      const apiBaseUrl = 'https://api.untappd.com/v4/';
      const clientId = 'D5DF25C6B3BC630869309C9521DCC8FC4274558C';
      const clientSecret = '340AF05A6D42460AEBB7485D6278945DB75DF796';

      if (this.searchTerm) {
        this.axios.get(`${apiBaseUrl}/search/beer?q=${this.searchTerm}&client_id=${clientId}&client_secret=${clientSecret}`)
          .then(response => {
            this.$emit('searchResult', response.data.response);
          })
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
