<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !email.isValid }">
        <label>Your E-mail:</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.val"
          @blur="clearValidity('email')"
        />
      </div>
      <div class="form-control" :class="{ invalid: !message.isValid }">
        <label>Message</label>
        <textarea
          rows="5"
          id="message"
          v-model.trim="message.val"
          @blur="clearValidity('message')"
        ></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">
        Please check the entered values above.
      </p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true
      },
      message: {
        val: '',
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.val === '') {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    submitForm() {
      console.log('Submit form');
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const data = {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id
      };
      this.$store.dispatch('requests/contactCoach', data);
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
