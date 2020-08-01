<component>
    <div class="leftNavBar">
        <div class="div1">
            Name
        </div>
        <div class="div2">
            Title
        </div>
        <div class="div3">
            Button 1
        </div>
        <div class="div4">
            Button 2
        </div>
        <div class="div5">
            Button 3
        </div>
        <div class="div6">
            Button 4
        </div>
        <div class="div7">
            Button 5
        </div>
        <div class="div8">
            Button 6
        </div>
    </div>


</component>

<script>
    export default {
        name: 'leftNavBar',
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    .leftNavBar {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(9, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }

    .div1 { grid-area: 1 / 1 / 3 / 3; }
    .div2 { grid-area: 3 / 1 / 4 / 4; }
    .div3 { grid-area: 4 / 1 / 5 / 3; }
    .div4 { grid-area: 5 / 1 / 6 / 3; }
    .div5 { grid-area: 6 / 1 / 7 / 3; }
    .div6 { grid-area: 7 / 1 / 8 / 3; }
    .div7 { grid-area: 8 / 1 / 9 / 3; }
    .div8 { grid-area: 9 / 1 / 10 / 3; }
</style>