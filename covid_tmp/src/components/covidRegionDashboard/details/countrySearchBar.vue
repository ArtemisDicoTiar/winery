<template>
    <div class="dashboardSearchBar">
        <md-card>
            <md-toolbar class="md-primary">
                <md-autocomplete
                        class="search"
                        v-model="selectedEmployee"
                        :md-options="employees"
                        md-layout="box"
                        style="width: 100%"
                >
                    <label>Search Country...</label>
                    <md-button class="md-icon-button">
                        <md-icon>search</md-icon>
                    </md-button>
                </md-autocomplete>

            </md-toolbar>
        </md-card>

    </div>
</template>

<script>
    export default {
        name: 'dashboardSearchBar',
        data: () => ({
            selectedEmployee: null,
            employees: [
                'Jim Halpert',
                'Dwight Schrute',
                'Michael Scott',
                'Pam Beesly',
                'Angela Martin',
                'Kelly Kapoor',
                'Ryan Howard',
                'Kevin Malone',
                'Creed Bratton',
                'Oscar Nunez',
                'Toby Flenderson',
                'Stanley Hudson',
                'Meredith Palmer',
                'Phyllis Lapin-Vance'
            ]
        })
    }
</script>

<style lang="scss" scoped>
    .search {

    }
</style>