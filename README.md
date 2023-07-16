# defaultjs-html-form


## How to install

### NPM

```bash
npm install @default-js/defaultjs-html-form
```

### Browser

```html
<script src="/dist/browser-defaultjs-html-form.js"></script>
```

## How to use

```html
<d-form>
    <d-page>
        <d-field name="field">
            <input type="text">
        </d-field>
        <d-container name="container">
            <d-field name="field">
                <input type="text">
            </d-field>
        </d-container>
        <d-list>
            <template>
                <d-row>
                    <d-delete-row>delete</d-delete-row>
                    <d-field name="field">
                        <input type="text">
                    </d-field>
                </d-row>
            </template>
            <d-rows></d-rows>
            <d-add-row>new entry</d-add-row>
        </d-list>
    </d-page>
    <d-control>
        <d-control-back>prev</d-control-back>
        <d-control-next>next</d-control-next>
        <d-control-summary>show summary</d-control-summary>
        <d-control-submit>submit</d-control-submit>
    </d-control>
</d-form>
```

```javascript
find("d-form").on("d-form-submit",async (event) => {
    const form = event.target;
    const data = await form.value();
    console.log(data);
});
```

## HTML Components

### `<d-form>`

### `<d-page>`

### `<d-field>`

### `<d-container>`

### `<d-list>`

### `<d-validation>`

### `<d-message>`

### `<d-control>`

#### `<d-control-back>`

#### `<d-control-next>`

#### `<d-control-summary>`

#### `<d-control-submit>`

### `<d-progress-bar>`

#### `d-step`