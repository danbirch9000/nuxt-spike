<template>
  <div class="ss-panel">
    <div v-if="hasErrors" class="error-summary">
      <div v-if="allowSave" class="error-message">{{ errors.first('description') }}</div>
      <div class="error-message">{{ errors.first('amount') }}</div>
      <div class="error-message">{{ errors.first('rate') }}</div>
      <div class="error-message">{{ errors.first('years') }}</div>
      <div class="error-message">{{ errors.first('monthly') }}</div>
    </div>
    <div :class="{'no-title': !allowSave}" class="goal-create-form">

      <div v-if="allowSave" class="standard-input">
        <label for="description">Goal title</label>
        <input v-validate="'required'"
               id="description"
               v-model="formItems.description"
               name="description"
               type="text"
               @keyup.enter="calculateGoal()">
      </div>

      <div class="standard-input">
        <label for="amount">Initial amount</label>
        <input v-validate="'required|numeric'"
               id="amount"
               v-model="formItems.amount"
               name="amount"
               type="number"
               @keyup.enter="calculateGoal()">
      </div>

      <div class="standard-input">
        <label for="rate">Rate (%)</label>
        <input v-validate="'required|numeric'"
               id="rate"
               v-model="formItems.rate"
               name="rate"
               maxlength="2"
               type="number"
               @keyup.enter="calculateGoal()">
      </div>

      <div class="standard-input">
        <label for="years">Years</label>
        <input v-validate="'required|numeric'"
               id="years"
               v-model="formItems.years"
               name="years"
               maxlength="2"
               type="number"
               @keyup.enter="calculateGoal()">
      </div>

      <div class="standard-input">
        <label for="monthly">Monthly contributions</label>
        <input v-validate="'required|numeric'"
               id="monthly"
               v-model="formItems.monthly"
               name="monthly"
               type="number"
               @keyup.enter="calculateGoal()">
      </div>
      <InlineButton :valid="true"
                    :action="() => calculateGoal()"
                    text="Calculate"/>
    </div>

    <div class="results">
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

      <ApexChart v-if="chartFormatData.length"
                 :chart-data="chartSeriesData"
                 unique-id="chart-calc"
                 type="line"/>
    </div>


    <InlineButton v-if="goal.length && allowSave"
                  :valid="true"
                  :use-confirmation="true"
                  :action="() => saveGoal()"
                  text="Save this goal"/>

  </div>

</template>

<script>
import moment from "moment";
import InlineButton from "~/components/InlineButton.vue";
import { getFinanceData } from "~/common/utilities.js";
import ApexChart from "~/components/ApexChart";

export default {
  components: { InlineButton, ApexChart },
  props: {
    allowSave: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formItems: {
        amount: "500",
        description: "",
        monthly: "50",
        rate: "8",
        startDate: moment().format(),
        years: "10"
      },
      goal: [],
      goalZero: []
    };
  },
  computed: {
    hasErrors() {
      return this.$validator.errors.items.length;
    },
    chartFormatData() {
      return this.goal.map(o => {
        let value = parseInt(o.value) ? parseInt(o.value) : 0;
        return [o.utc, value];
      });
    },
    chartDataZeroRate() {
      return this.goalZero.map(o => {
        let value = parseInt(o.value) ? parseInt(o.value) : 0;
        return [o.utc, value];
      });
    },
    chartSeriesData() {
      return [
        {
          name: "Goal",
          data: this.chartFormatData
        },
        {
          name: "0% return",
          data: this.chartDataZeroRate
        }
      ];
    }
  },
  mounted() {
    if (!this.allowSave) {
      this.calculateGoal();
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
    saveGoal() {
      this.$store
        .dispatch("CREATE_GOAL", this.formItems)
        .then(() => {
          this.$router.push("/goals");
        })
        .catch(() => {
          console.log("Error creating goal");
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
      this.goalZero = getFinanceData(
        0,
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
    grid-template-columns: 2.5fr repeat(4, 1.3fr) auto;
    > div:last-child {
      align-self: end;
    }
  }
  @include desktop {
    grid-template-columns: 2.5fr repeat(4, 1.3fr) auto;
    > div:last-child {
      align-self: end;
    }
  }
  &.no-title {
    @include tablet {
      grid-template-columns: repeat(4, 1.3fr) auto;
    }
    @include desktop {
      grid-template-columns: repeat(4, 1.3fr) auto;
    }
  }
}

.table-list li {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.results {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  @include tablet {
    grid-template-columns: 1fr 1fr;
  }
  @include desktop {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
