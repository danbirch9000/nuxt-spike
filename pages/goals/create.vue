<template>
  <div>
    <h1 class="page-header">Create new goal</h1>

    <section class="container">
      <NewGoal />
    </section>
  </div>

</template>

<script>
import pageMixin from "~/mixins/pageMixin";
import NewGoal from "~/components/goals/NewGoal";

export default {
  components: { NewGoal },
  mixins: [pageMixin],
  middleware: ["check-auth", "auth"] // check-auth calls INIT_AUTH to make sure the user is authenticated
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
</style>
