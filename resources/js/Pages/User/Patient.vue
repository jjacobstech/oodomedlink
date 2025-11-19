<script setup lang="ts">

const props = defineProps<Props>();
console.log(props);

interface Patient {
      id: string;
      full_name: string;
      email: string;
      phone_no: string;
      gender: string;
      date_of_birth: string | null;
      address: string | null;
      created_at: string;
      updated_at: string;


}

interface Props {
      patients?: Patient;
}
</script>
<template>

</template>