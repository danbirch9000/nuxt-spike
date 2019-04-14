<template>
  <div class="ss-panel">
    <div class="goal-create-form">
      <div class="standard-input">
        <label for="description">Title</label>
        <input v-validate="'required'"
               id="description"
               v-model="formItems.description"
               name="description"
               type="text">
        <span class="error-message">{{ errors.first('description') }}</span>
      </div>

      <div class="standard-input">
        <label for="amount">Initial amount</label>
        <input v-validate="'required|numeric'"
               id="amount"
               v-model="formItems.amount"
               name="amount"
               type="number">
        <span class="error-message">{{ errors.first('amount') }}</span>
      </div>

      <div class="standard-input">
        <label for="rate">Rate</label>
        <input v-validate="'required|numeric'"
               id="rate"
               v-model="formItems.rate"
               name="rate"
               type="number">
        <span class="error-message">{{ errors.first('rate') }}</span>
      </div>

      <div class="standard-input">
        <label for="years">Years</label>
        <input v-validate="'required|numeric'"
               id="years"
               v-model="formItems.years"
               name="years"
               type="number">
        <span class="error-message">{{ errors.first('years') }}</span>
      </div>

      <div class="standard-input">
        <label for="monthly">Monthly contributions</label>
        <input v-validate="'required|numeric'"
               id="monthly"
               v-model="formItems.monthly"
               name="monthly"
               type="number">
        <span class="error-message">{{ errors.first('monthly') }}</span>
      </div>
      <InlineButton :valid="true"
                    :action="() => calculateGoal()"
                    text="Calculate"/>
    </div>

    <div v-if="goal.length" class="goal-table">
      <ul class="table-list">
        <li class="table-list-header">
          <span>Date</span>
          <span>Total interest</span>
          <span>Year interest</span>
          <span>Total value</span>
        </li>
        <li v-for="(record, index) in goal" :key="index" class="table-list-body">
          <span>{{ record.date }}</span>
          <span>{{ record.totalInterest | sterling }}</span>
          <span>{{ record.interest | sterling }}</span>
          <span>{{ record.value | sterling }}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import moment from "moment";
import InlineButton from "~/components/InlineButton.vue";
import { getFinanceData } from "~/common/utilities.js";

export default {
  components: { InlineButton },
  data() {
    return {
      formItems: {
        amount: "",
        description: "",
        monthly: "",
        rate: "",
        startDate: moment(),
        years: ""
      },
      goal: []
    };
  },
  computed: {
    hasErrors() {
      return this.$validator.errors.items.length;
    }
  },
  methods: {
    calculateGoal() {
      this.$validator.validateAll().then(() => {
        if (!this.hasErrors) {
          this.getGoalData();
        }
      });
    },
    getGoalData() {
      this.goal = getFinanceData(
        this.formItems.rate,
        this.formItems.amount,
        this.formItems.monthly,
        this.formItems.years,
        this.formItems.startDate
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.goal-create-form {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  @include tablet {
    grid-template-columns: repeat(3, 1fr);
    > div:last-child {
      align-self: end;
    }
  }
  @include desktop {
    grid-template-columns: repeat(3, 1fr);
    > div:last-child {
      align-self: end;
    }
  }
}

.table-list li {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
