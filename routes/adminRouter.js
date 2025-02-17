const express = require('express')
const router =express.Router()
const adminController = require('../controllers/admin/adminController')
const customerController = require('../controllers/admin/customerController')
const categoryController  = require('../controllers/admin/categoryController')
const brandController = require('../controllers/admin/brandController')
const productController = require('../controllers/admin/productController')
const orderController = require('../controllers/admin/OrderController')
const couponController = require('../controllers/admin/couponController')
const salesController = require('../controllers/admin/salesController')

const {userAuth,adminAuth} =require('../middlewares/auth')
const multer =require('multer')
const storage = require('../helpers/multer')
const uploads = multer({storage:storage})




router.get('/login',adminController.loadlogin)
router.post('/login',adminController.login)
router.get('/',adminAuth,adminController.loadDashboard)
router.get('/pageerror',adminController.pageerror)
router.get('/logout',adminController.logout)
router.get('/users',adminAuth,customerController.customerInfo)
router.get('/blockCustomer',adminAuth,customerController.customerBlocked)
router.get('/unblockCustomer',adminAuth,customerController.customerunBlocked)
router.get('/category',adminAuth,categoryController.categoryInfo)
router.post('/addCategory',adminAuth,categoryController.addCategory)
router.post('/addCategoryOffer',adminAuth,categoryController.addCategoryOffer)
router.post('/removeCategoryOffer',adminAuth,categoryController.removeCategoryOffer)
router.get('/listCategory',adminAuth,categoryController.getListCategory)
router.get('/unlistCategory',adminAuth,categoryController.getUnlistCategory)
router.get('/editCategory',adminAuth,categoryController.getEditCategory)
router.post('/editCategory/:id',adminAuth,categoryController.editCategory)
router.get('/brands',adminAuth,brandController.getBrandPage)
router.post('/addBrand',adminAuth,uploads.single('image'),brandController.addBrand)


router.get('/addProducts',adminAuth,productController.getProductAddPage)
router.post('/addProducts',adminAuth,uploads.array('images',4),productController.addProducts)



router.get('/blockBrand',adminAuth,brandController.blockBrand)
router.get('/unBlockBrand',adminAuth,brandController.unBlockBrand)
router.get('/deleteBrand',adminAuth,brandController.deleteBrand)
router.get('/products',adminAuth,productController.getAllProducts)
router.post('/addProductOffer',adminAuth,productController.addProductOffer)
router.post('/removeProductOffer',adminAuth,productController.removeProductOffer)
router.get('/blockProduct',adminAuth,productController.blockProduct)
router.get('/unblockProduct',adminAuth,productController.unblockProduct)
router.get('/editProduct',adminAuth,productController.getEditProduct)
router.post('/editProduct/:id',adminAuth,uploads.array('images',4),productController.editProduct)
router.post('/deleteImage',adminAuth,productController.deleteSingleImage)


router.get('/orderList',adminAuth,orderController.listOrders)
router.get('/orders/:orderId', adminAuth,orderController.viewOrder);
router.post('/orders/:orderId/status',adminAuth,orderController.changeOrderStatus);
router.post('/orders/cancel/:orderId',adminAuth,orderController.cancelOrder);
router.post('/update-order-status/:orderId', orderController.updateOrderStatus)


router.get('/orders/view-order/:orderId',orderController. viewOrder);
router.post('/approve-return/:orderId/:productId', orderController.approveReturn);
router.post('/reject-return/:orderId/:productId', orderController.rejectReturn);

router.get('/coupon',adminAuth,couponController.loadCoupon)
router.post('/createCoupon',adminAuth,couponController.createCoupon)
router.get('/editCoupon',adminAuth,couponController.editCoupon)
router.post('/updateCoupon',adminAuth,couponController.updateCoupon)
router.get('/deleteCoupon',adminAuth,couponController.deleteCoupon)


router.get("/loadDashboard",adminAuth,salesController.loadDashboard);
router.post("/dashboard",adminAuth,salesController.dashboard);
router.get("/dashBoard/download/pdf",adminAuth,salesController.generatePdfReport);
router.get("/dashBoard/download/excel",adminAuth,salesController.generateExcelReport);

module.exports = router 