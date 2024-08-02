// Update Product Total based on quantity
document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.querySelector('.quantity__input');
    const totalCostSpan = document.getElementById('totalCost');
    const addButton = document.querySelector('.quantity__button[name="plus"]');
    const subtractButton = document.querySelector('.quantity__button[name="minus"]');

    function updateCost() {
        const quantity = parseInt(quantityInput.value, 10);
        if (isNaN(quantity) || quantity < 1) {
            quantityInput.value = 1;
        }
        const totalCost = unitPrice * parseInt(quantityInput.value, 10);
        totalCostSpan.textContent = totalCost.toFixed(2);
    }

    addButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value, 10);
        if (!isNaN(currentQuantity)) {
            quantityInput.value = currentQuantity + 1;
            updateCost();
        }
    });

    subtractButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value, 10);
        if (!isNaN(currentQuantity) && currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
            updateCost();
        }
    });

    quantityInput.addEventListener('input', () => {
        let currentQuantity = parseInt(quantityInput.value, 10);
        if (isNaN(currentQuantity) || currentQuantity < 1) {
            quantityInput.value = 1;
        }
        updateCost();
    });

    updateCost();
});


// Display Selected Product Variant
document.addEventListener('DOMContentLoaded', () => {
    const variantRadios = document.querySelector('variant-radios');
    const variantTitleSpan = document.getElementById('variantTitle');

    // Extract variants from the embedded JSON
    const variants = JSON.parse(variantRadios.querySelector('script[type="application/json"]').textContent);

    function updateSelectedVariantTitle() {
        // Find the selected radio button
        const selectedRadio = variantRadios.querySelector('input[type="radio"]:checked');
        if (selectedRadio) {
            const selectedValue = selectedRadio.value;

            // Find the variant with the selected value
            const selectedVariant = variants.find(variant => 
                variant.options.includes(selectedValue)
            );

            // Update the title span
            if (selectedVariant) {
                variantTitleSpan.textContent = selectedVariant.title;
            }
        }
    }
    variantRadios.addEventListener('change', updateSelectedVariantTitle);

    updateSelectedVariantTitle();
});
