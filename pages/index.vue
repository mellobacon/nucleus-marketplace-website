<template>
    <div class="index">
        <div class="heading">
            <h1>Extensions For Nucleus</h1>
            <p>Personalize your developer experience with Nucleus Marketplace extensions</p>
            <div class="buttons">
                <Button b_style="secondary" width="120" label="Learn More" height="40" />
                <Button width="150" height="40" label="Make Your Own" />
            </div>
            <SearchBar placeholder="Search for Extensions..." />
        </div>
        <div class="cards-container">
            <div class="data-filters">
                <p class="data-count">0 Results</p>
                <PrimeDropdown class="filter" placeholder="Sort By: Extensions"></PrimeDropdown>
            </div>
            <div class="card-list">
                <ExtensionBox name="dummy extension" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use "../assets/styles" as style;
.index {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 50px 0;
    .heading {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 60%;
        margin-bottom: 50px;
        h1 {
            color: style.$primary;
            font-size: 2.3rem;
        }
        p {
            font-weight: 300;
            margin: 5px;
        }
        .buttons {
            margin: 25px 0 50px 0;
        }
    }
    .cards-container {
        width: 60%;
        display: flex;
        flex-direction: column;
    }
    .data-filters {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
    }
    .filter {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 0px;
        padding-left: 8px;
        .p-dropdown-label {
            color: style.$text-color;
        }
    }
    .card-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-flow: wrap;
        gap: 30px;
        align-items: center;
    }
}
</style>