import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import popper from "popper.js";
import svg4everybody from "svg4everybody";
import bootstrap from "bootstrap";
import bootstrapDatepicker from "bootstrap-datepicker";
import datatables from "datatables";
require('datatables.net-responsive-bs4');
import bootbox from 'bootbox';
var SameHeight = require('same-height');
SameHeight.init('.same-height-md', "screen and (min-width: 768px)");
import tinymce from "tinymce";

// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default';

// A theme is also required
import 'tinymce/themes/silver';
import 'tinymce/plugins/link';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/help';


+function ($) {

    svg4everybody();


    //dataTable
    var tableDataTable = $('.table-dataTable').DataTable({
	responsive: true,
	pageLength: 20,
	lengthChange: false,
	searching: false,
	oLanguage: {
	    oPaginate: {
		sFirst: '<i class="fas fa-angle-double-left"></i>',
		sPrevious: '<i class="fas fa-angle-left"></i>',
		sNext: '<i class="fas fa-angle-right"></i>',
		sLast: '<i class="fas fa-angle-double-right"></i>'
	    }
	},
	order: [],
	columnDefs: [{
		"targets": 'no-sort',
		"orderable": false
	    }]
    });

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
	$("body").toggleClass("sidebar-toggled");
	$(".sidebar").toggleClass("toggled");
	if ($(".sidebar").hasClass("toggled")) {
	    $('.sidebar .collapse').collapse('hide');
	}
	;
	tableDataTable.columns.adjust().responsive.recalc();
    });
    // Close any open menu accordions when window is resized below 768px
    $(window).on("load resize", function (e) {
	if ($(window).width() < 768) {
	    $('.sidebar .collapse').collapse('hide');
	}
	;
	// Toggle the side navigation when window is resized below 480px
	if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
	    $("body").addClass("sidebar-toggled");
	    $(".sidebar").addClass("toggled");
	    $('.sidebar .collapse').collapse('hide');
	}
	;
	tableDataTable.columns.adjust().responsive.recalc();
    });
    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
	if ($(window).width() > 768) {
	    var e0 = e.originalEvent,
		    delta = e0.wheelDelta || -e0.detail;
	    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
	    e.preventDefault();
	}
    });
    // Scroll to top button appear
    $(document).on('scroll', function () {
	var scrollDistance = $(this).scrollTop();
	if (scrollDistance > 100) {
	    $('.scroll-to-top').fadeIn();
	} else {
	    $('.scroll-to-top').fadeOut();
	}
    });
    // Smooth scrolling
    $(document).on('click', 'a.scroll-to-top', function (e) {
	$("html, body").animate({scrollTop: 0}, 600);
	return false;
    });
    //Tooltips
    $('[data-toggle="tooltip"]').tooltip();

    //TinyMCE init
    tinymce.init({
	selector: 'textarea.tinymce',
	skin: "oxide",
	skin_url: '../assets/css/tinymce/skins/ui/oxide',
	theme: 'silver',
	theme_url: '../assets/css/tinymce/silver/theme.js',
	content_css: "../assets/css/tinymce/skins/content/default/content.css",
	height: 500,
	plugins: [
	    'link advlist autolink image lists preview hr anchor pagebreak',
	    'searchreplace wordcount visualblocks code fullscreen insertdatetime media nonbreaking',
	    'table template paste help'
	],
	branding: false
    });

    // Prevent Bootstrap dialog from blocking focusin
    $(document).on('focusin', function (e) {
	if ($(e.target).closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root").length) {
	    e.stopImmediatePropagation();
	}
    });

    $('.datepicker').datepicker({
	format: 'dd-mm-yyyy',
    });

}(jQuery);