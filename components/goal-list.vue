<template>
    <ul id="example-1" v-if="getGoalsFromStore.length > 0">
        <li v-for="item in getGoalsFromStore" :key="item.description">
        {{item.description}}
        </li>
    </ul>
</template>

<script>
    export default {
        computed: {
            getGoalsFromStore: function(){
                return this.$store.state.goals
            }
        }
    }
</script>