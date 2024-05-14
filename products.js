var products = [];
var ascending = true; // Переменная для отслеживания состояния сортировки
var modal = document.getElementById('myModal');
var btns = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

window.loadProducts = function(productType) {
    // Загрузка продуктов при загрузке страницы
    $.ajax({
        type: "GET",
        url: "bakery.xml",
        dataType: "xml",
        success: function(xml){
            $(xml).find(productType).each(function(){
                var image = $(this).find('IMG').text();
                var name = $(this).find('NAME').text();
                var weight = $(this).find('WEIGHT').text();
                var composition = $(this).find('COMPOSITION').text();
                var price = parseFloat($(this).find('PRICE').text()); // Преобразование цены в число

                products.push({image: image, name: name, price: price, weight: weight,composition: composition});
            });

            // Добавление продуктов на страницу
            addProductsToPage();
        }
    });

    function addProductsToPage() {
        // Очистка предыдущих продуктов
        $('.first_product_of_bake, .second_product_of_bake, .third_product_of_bake, .fourth_product_of_bake, .fifth_product_of_bake, .sixth_product_of_bake, .seventh_product_of_bake, .eighth_product_of_bake, .ninth_product_of_bake, .tenth_product_of_bake,.eleventh_product_of_bake,.twelfth_product_of_bake').empty();

        // Добавление продуктов на страницу
        products.forEach(function(product, index) {
            var productDiv = $('<div><img class="images_of_products" src= "'+product.image + '""><p>' + product.name + '</p><div class="columns_of_rows_of_products"><p>' + product.price+'р' + '</p><button class="buy">Приобрести</button></div></div>');
            $('.first_product_of_bake, .second_product_of_bake, .third_product_of_bake, .fourth_product_of_bake, .fifth_product_of_bake, .sixth_product_of_bake, .seventh_product_of_bake, .eighth_product_of_bake, .ninth_product_of_bake, .tenth_product_of_bake,.eleventh_product_of_bake,.twelfth_product_of_bake').eq(index).append(productDiv);

            // Добавление обработчика событий для открытия модального окна при клике на изображение
            productDiv.find('.images_of_products').click(function() {
                // Заполнение модального окна информацией о продукте
                $('#myModal .modal-content p').html('<div class="div_modal-content"><div class="location_of_image_of_modal"><img class="images_of_modal" src= "'+ product.image+ '""></div> <div class="information_of_modal">' +'<h3><b>'+product.name+ '</h3></b>'+'<p><b>Цена: </b>' + product.price+' p</p>'+'<p>'+'<p><b>Вес:</b> '+product.weight+' грамм</p>'+'<p><b>Состав:</b> '+product.composition +' </p>'+ '<div class="right"><button class="buy">Приобрести</button></div></div></div>');
                // Отображение модального окна
                $('#myModal').show();
            });
        });
    }

    // Сортировка продуктов при нажатии на кнопку
    $('#sortButton').click(function() {

        var currentText = $(this).text();
        
        if(currentText == "Сортировать по цене"||currentText == "Сортировать по возрастанию") {
            $(this).text("Сортировать по убыванию");
        } else {
            $(this).text("Сортировать по возрастанию");
        }

        // Сортировка продуктов по цене
        products.sort(function(a, b) {
            return ascending ? a.price - b.price : b.price - a.price;
        });

        // Переключение состояния сортировки
        ascending = !ascending;

        // Добавление отсортированных продуктов на страницу
        addProductsToPage();
    });

    // Закрытие модального окна при клике на элемент с классом "close"
    span.onclick = function() {
        modal.style.display = "none";
    }
};