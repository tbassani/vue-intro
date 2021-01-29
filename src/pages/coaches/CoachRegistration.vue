<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <base-card v-else-if="!isLoading && !error">
        <h2>Register as a coach!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  methods: {
    async saveData(formData) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/registerCoach', formData);
        this.isLoading = false;
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Somenthing went wrong';
      }
    },
    handleError() {
      this.error = null;
      this.$router.replace('/coaches');
    }
  }
};
</script>
<style scoped></style>
