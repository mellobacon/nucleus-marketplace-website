<template>
    <div class="create-extension">
        <form>
            <h3>Create Extension</h3>
            <Upload />
            <Input class="form-input" name="source-code" label="Source Code URL" hint_text="Link to where you have your source code (GitHub, BitBucket, etc)" />
            <Input class="form-input" name="website" label="Website URL" hint_text="Link to a website for users to find out more about your extension. Optional" />
            <PrimeDropdown class="form-input" placeholder="Select License" />
            <Button label="Submit" />
        </form>
    </div>
</template>

<style lang="scss">
@use "../assets/styles" as style;
.create-extension {
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 20px;
    form {
        width: 60%;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 15px;
        .form-input {
            width: 100%;
        }
    }
}
</style>
