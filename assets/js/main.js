particlesJS('particles-js', {
	particles: {
		number: {
			value: 200,
			density: {
				enable: true,
				value_area: 900
			}
		},
		color: {
			value: '#ffffff'
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#000000'
			},
			polygon: {
				nb_sides: 5
			},
			image: {
				src: './img/lock.svg',
				width: 100,
				height: 100
			}
		},
		opacity: {
			value: 0.5,
			random: false,
			anim: {
				enable: false,
				speed: 1,
				opacity_min: 0.1,
				sync: false
			}
		},
		size: {
			value: 2,
			random: true,
			anim: {
				enable: false,
				speed: 40,
				size_min: 0.1,
				sync: false
			}
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: '#ffffff',
			opacity: 0.4,
			width: 1
		},
		move: {
			enable: true,
			speed: 6,
			direction: 'none',
			random: false,
			straight: false,
			out_mode: 'out',
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	},
	interactivity: {
		detect_on: 'window',
		events: {
			onhover: {
				enable: true,
				mode: 'grab'
			},
			onclick: {
				enable: true,
				mode: 'push'
			},
			resize: true
		},
		modes: {
			grab: {
				distance: 100,
				line_linked: {
					opacity: 1
				}
			},
			bubble: {
				distance: 400,
				size: 40,
				duration: 2,
				opacity: 8,
				speed: 3
			},
			repulse: {
				distance: 200
			},
			push: {
				particles_nb: 2
			},
			remove: {
				particles_nb: 2
			}
		}
	},
	retina_detect: true,
	config_demo: {
		hide_card: false,
		background_color: '#b61924',
		background_image: '',
		background_position: '50% 50%',
		background_repeat: 'no-repeat',
		background_size: 'cover'
	}
});

$(window).on(
	'scroll',
	_.debounce(function() {
		var $nav = $('header'),
			navHeight = $nav.outerHeight(),
			windowTop = $(this).scrollTop();

		if (windowTop > navHeight) {
			$nav.addClass('small');
		} else {
			$nav.removeClass('small');
		}
	}, 100)
);

$('a[href^="#"]').on('click', function(e) {
	e.preventDefault();
	var id = $(this).attr('href');
	var targetOffset = $(id).offset().top;
	$('html, body').animate(
		{
			scrollTop: targetOffset - 100
		},
		500
	);
	$('.mobile-btn').removeClass('active');
	$('.mobile-menu').removeClass('active');
});

$(function() {
	$('.owl-carousel').owlCarousel({
		loop: true,
		margin: 5,
		responsive: {
			0: {
				items: 1,
				nav: true
			},
			600: {
				items: 3,
				nav: false
			},
			1000: {
				items: 4,
				nav: true,
				loop: false
			}
		}
	});
});
/**
 * animação do menu mobile
 */
$('.mobile-btn').click(function() {
	$(this).toggleClass('active');
	$('.mobile-menu').toggleClass('active');
});

$('#contact-form').submit((e) => {
	e.preventDefault();
	$('#contact-form').append("<div id='loading'>Aguarde...</div>");
	const name = $('#contact-form').find('input[name="name"]').val();
	const mail = $('#contact-form').find("input[name='mail']").val();
	const message = $('#contact-form').find("textarea[name='message']").val();

	$.ajax({
		// url: 'http://localhost:3000/sendmail',
		// method: 'POST',
		// context: {name, mail, message}
		contentType: 'application/json',
		type: 'POST',
		url: 'http://localhost:3000/sendmail',
		data: JSON.stringify({ name, mail, message }),
		success: (msg) => {
			$('#loading').remove();
		}
	});
});
