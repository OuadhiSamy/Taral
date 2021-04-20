<template>
  <div class="layout-selector">
    <ul>
        <li class="layout-selector__item">
            Layout 1
        </li>
        <li class="layout-selector__item">
            Layout 2
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LayoutSelector",
};
</script>

<style lang="scss">
.layout-selector {
    position: absolute;
    top: 40px;
    right: 40px;

    &__item {
        font-size: 30px;
        font-weight: bold;
        margin-top: 24px;
        color: white;
        cursor: pointer;
    }
}
</style>