<template>
    <div id="Home" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 →  World Statistics Correlation</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <md-toolbar class="md-accent">
                    <span class="md-title">** Data Caution **</span>
                </md-toolbar>
                <md-toolbar style="margin-bottom: 30px">
                        <span class="md-subheading">
                            This page uses COVID-19 data freezed on 29/03/2021. <br/>
                            The world statistics data are crawled on Summer/2020. <br/>
                            The calculation automation is on process using Airflow ETL. <br/>
                        </span>
                </md-toolbar>


                <br/>
                <md-divider/>
                <br/>

                <span class="md-subheading">
                    Data Index<br/>
                </span>
                <md-table>
                    <md-table-row>
                        <md-table-head>Y-axis Index</md-table-head>
                        <md-table-head>Meaning</md-table-head>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>SI_POV_MDIM_17_XQ</md-table-cell>
                        <md-table-cell>"Multidimensional poverty index, children (population ages 0-17) (scale 0-1)"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DT_NFL_UNRW_CD</md-table-cell>
                        <md-table-cell>"Net official flows from UN agencies, UNRWA (current US$)"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>NY_GSR_NFCY_KN</md-table-cell>
                        <md-table-cell>Net primary income (Net income from abroad) (constant LCU)</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLD4_CR_CG_Z1</md-table-cell>
                        <md-table-cell>"Gross PSD, Central Gov.-D4, All maturities, D3+insurance, pensions, and standardized guarantees, Nominal Value, % of GDP"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLD4_CR_GG_Z1</md-table-cell>
                        <md-table-cell>"Gross PSD, General Gov.-D4, All maturities, D3+insurance, pensions, and standardized guarantees, Nominal Value, % of GDP"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLDS_CR_MV_BC_Z1</md-table-cell>
                        <md-table-cell>"Gross PSD, Budgetary Central Gov., All maturities, Debt Securities, Market value, % of GDP"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLDS_CR_MV_FC</md-table-cell>
                        <md-table-cell>"Gross PSD, Financial Public Corp., All maturities, Debt Securities, Market value, National Currency"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLDS_CR_MV_FC_CD</md-table-cell>
                        <md-table-cell>"Gross PSD, Financial Public Corp., All maturities, Debt Securities, Market value, US$"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLDS_CR_MV_NF</md-table-cell>
                        <md-table-cell>"Gross PSD, Nonfinancial Public Corp., All maturities, Debt Securities, Market value, National Currency"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLDS_CR_MV_NF_CD</md-table-cell>
                        <md-table-cell>"Gross PSD, Nonfinancial Public Corp., All maturities, Debt Securities, Market value, US$"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLDS_CR_MV_NF_Z1</md-table-cell>
                        <md-table-cell>"Gross PSD, Nonfinancial Public Corp., All maturities, Debt Securities, Market value, % of GDP"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLIN_CR_FC_Z1</md-table-cell>
                        <md-table-cell>"Gross PSD, Financial Public Corp., All maturities, Insurance, pensions, and standardized guarantee schemes, Nominal Value, % of GDP"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLIN_CR_NF_Z1</md-table-cell>
                        <md-table-cell>"Gross PSD, Nonfinancial Public Corp., All maturities, Insurance, pensions, and standardized guarantee schemes, Nominal Value, % of GDP"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>DP_DOD_DLOA_CR_FC_Z1</md-table-cell>
                        <md-table-cell>"Gross PSD, Financial Public Corp., All maturities, Other accounts payable, Nominal Value, % of GDP"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>HF_STA_BLSG_ZS_Q1</md-table-cell>
                        <md-table-cell>Blood sugar measured in last 5 years (% of population at risk of diabetes): Q1 (lowest)</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>HF_STA_BLSG_ZS_Q2</md-table-cell>
                        <md-table-cell>Blood sugar measured in last 5 years (% of population at risk of diabetes): Q2</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>HF_STA_BLSG_ZS_Q4</md-table-cell>
                        <md-table-cell>Blood sugar measured in last 5 years (% of population at risk of diabetes): Q4</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>HF_STA_BPDI_Q3</md-table-cell>
                        <md-table-cell>"Mean diastolic blood pressure, adult population (mmHg): Q3"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>HF_STA_BPDI_Q4</md-table-cell>
                        <md-table-cell>"Mean diastolic blood pressure, adult population (mmHg): Q4"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>HF_STA_BPSY_Q1</md-table-cell>
                        <md-table-cell>"Mean systolic blood pressure, adult population (mmHg): Q1 (lowest)"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>HF_STA_BPSY_Q2</md-table-cell>
                        <md-table-cell>"Mean systolic blood pressure, adult population (mmHg): Q2"</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>HF_STA_BPSY_Q3</md-table-cell>
                        <md-table-cell>"Mean systolic blood pressure, adult population (mmHg): Q3"</md-table-cell>
                    </md-table-row>

                </md-table>


























                <img src="./corr0328_29.png"
                     alt="Picture of Theodore Roosevelt"
                     style="display: block;
                          margin-left: auto;
                          margin-right: auto;
                          width: 50%;"
                >

            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";


    export default {
        name: 'corr',
        components:{
            navBar
        },
        data () {
            return {
                menuVisible: false
            }
        }
    }

</script>

<style lang="scss" scoped>
    .md-app {
        min-height: 700px;
        border: 1px solid rgba(#000, .12);
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>