const Vegetables = [
    {
        name: "Asparagus",
        type: "Vegetable",
        shelf_life: 7,
        image_url: "https://images.heb.com/is/image/HEBGrocery/000319073"
    },
    {
        name: "Broccoli",
        type: "Vegetable",
        shelf_life: 7,
        image_url: "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/broccoli_commodity-page.png"
    },
    {
        name: "Brussels Sprouts",
        type: "Vegetable",
        shelf_life: 14,
        image_url: "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/brussels-sprouts_commodity-page.png"
    },
    {
        name: "Cabbage",
        type: "Vegetable",
        shelf_life: 60,
        image_url: "https://images.heb.com/is/image/HEBGrocery/000374791"
    },
    {
        name: "Carrots",
        type: "Vegetable",
        shelf_life: 90,
        image_url: "https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg"
    },
    {
        name: "Cauliflower",
        type: "Vegetable",
        shelf_life: 14,
        image_url: "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/cauliflower_commodity-page.png"
    },
    {
        name: "Celery",
        type: "Vegetable",
        shelf_life: 28,
        image_url: "https://www.markon.com/sites/default/files/styles/large/public/pi_photos/Celery_Stalks_MFC_Hero.jpg"
    },
    {
        name: "Cucumbers",
        type: "Vegetable",
        shelf_life: 7,
        image_url: "https://target.scene7.com/is/image/Target/GUEST_7edf66d0-8f08-4c9e-8bf5-0996578bf009?wid=488&hei=488&fmt=pjpeg"
    },
    {
        name: "Green Beans",
        type: "Vegetable",
        shelf_life: 7,
        image_url: "https://www.momontimeout.com/wp-content/uploads/2013/11/fresh-green-beans-733x733.jpg"
    },
    {
        name: "Onions",
        type: "Vegetable",
        shelf_life: 60,
        image_url: "https://www.meijer.com/content/dam/meijer/product/0004/12/5002/72/0004125002725_1_A1C1_1200.png"
    },
    {
        name: "Squash",
        type: "Vegetable",
        shelf_life: 7,
        image_url: "https://www.slenderkitchen.com/sites/default/files/styles/gsd-1x1/public/articles/yellow-squash.jpg"
    },
    {
        name: "Zucchini",
        type: "Vegetable",
        shelf_life: 7,
        image_url: "https://www.jessicagavin.com/wp-content/uploads/2018/05/zucchini-2-1200.jpg"
    },
];

const Fruit = [
    {
        name: "Raspberries",
        type: "Fruit",
        shelf_life: 10,
        image_url: "https://www.meijer.com/content/dam/meijer/product/0007/14/3001/10/0007143001109_0_A1C1_1200.png"
    },
]

const Dairy = [
    {
        name: "Eggs",
        type: "Dairy",
        shelf_life: 28,
        image_url: "https://i0.wp.com/khymos.org/wp-content/2009/04/egg-tray.jpg?fit=620%2C620&ssl=1"
    },
];

module.exports = [...Vegetables, ...Fruit, ...Dairy];