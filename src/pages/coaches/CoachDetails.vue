<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested?</h2>
          <base-button link @click="contactCoach">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        >
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    areas() {
      return this.selectedCoach.areas ? this.selectedCoach.areas : [];
    },
    rate() {
      return this.selectedCoach.hourlyRate ? this.selectedCoach.hourlyRate : '';
    },
    description() {
      return this.selectedCoach.description
        ? this.selectedCoach.description
        : '';
    }
  },
  methods: {
    contactCoach() {
      this.$router.push('/contact');
    }
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      coach => coach.id === this.id
    );
  }
};
</script>
