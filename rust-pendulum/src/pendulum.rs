pub mod pendulum {
    use crate::vector::vector::Vector;
    use speedy2d::color::Color;
    use speedy2d::window::{WindowHandler, WindowHelper};
    use speedy2d::Graphics2D;

    pub struct MyWindowHandler {
        pub pendulum: Pendulum,
        pub second_pendulum: Pendulum,
        pub circle: Circle,
    }

    pub struct Circle {
        radius: f32,
        mass: f32,
        position: Vector,
    }

    impl WindowHandler for MyWindowHandler {
        fn on_draw(&mut self, helper: &mut WindowHelper, graphics: &mut Graphics2D) {
            graphics.clear_screen(Color::from_rgb(0.8, 0.9, 1.0));

            self.pendulum.update();
            self.pendulum.draw(graphics);

            self.second_pendulum.update();
            self.second_pendulum.draw(graphics);

            self.circle.update();
            self.circle.draw(graphics);

            // redraw frames
            helper.request_redraw();
        }

        fn on_key_up(
                &mut self,
                helper: &mut WindowHelper<()>,
                virtual_key_code: Option<speedy2d::window::VirtualKeyCode>,
                scancode: speedy2d::window::KeyScancode
            ) {

        }
    }

    pub struct Pendulum {
        // Pendulum position
        origin: Vector,

        // Ball position
        position: Vector,

        angle: f32,

        angular_velocity: f32,
        angular_acceleration: f32,

        //Pendulum length
        length: f32,

        // Ball mass
        mass: f32,
        gravity: f32,
    }

    impl Pendulum {
        pub fn new(x: f32, y: f32, length: f32) -> Pendulum {
            Pendulum {
                // We need to set the origin of the pendulum
                origin: Vector::new(x, y),

                // We'll set the position when we update the pendulum, for now, set default value
                position: Vector::new(0.0, 0.0),

                // Base angle should be 1.0 radian
                angle: 1.0,

                // Pendulum start without moving
                angular_velocity: 0.0,

                // Pendulum start without acceleration
                angular_acceleration: 0.0,
                length,
                mass: 1.0,    // 1.0 for mass for the example
                gravity: 1.5, // play with gravity
            }
        }

        fn update(&mut self) {
            // Use pendulum equation to calculate angular acceleration
            self.angular_acceleration = -1.0 * self.gravity * self.angle.sin() / self.length;

            // Angular velocity is the angular velocity plus angular acceleration
            self.angular_velocity += self.angular_acceleration;

            // Angle is the angle plus angular velocity
            self.angle += self.angular_velocity;

            // Position is the polar coordinatest ranslated to cartesian coordinates
            self.position.set(
                self.length * self.angle.sin(),
                self.length * self.angle.cos(),
            );

            // Final position of ball in canvas is pendulum plus position vector
            self.position.add(&self.origin);
        }

        fn draw(&self, graphics: &mut Graphics2D) {
            // draw a line of the pendulum
            // takes start and end line position, width and color
            graphics.draw_line(
                (self.origin.x, self.origin.y),
                (self.position.x, self.position.y),
                3.0,
                Color::RED,
            );

            // draw the pendulum ball
            // it takes the position of the ball, that is equal to the extreme line position
            graphics.draw_circle((self.position.x, self.position.y), 30.0, Color::RED);
        }
    }

    impl Circle {
        pub fn new(radius: f32, mass: f32) -> Circle {
            Circle {
                radius,
                mass,
                position: Vector::new(0.0, 40.0),
            }
        }

        fn update(&mut self) {
            self.position
                .set(self.position.x + 1.0, self.position.x + 1.0);
        }

        fn draw(&self, graphics: &mut Graphics2D) {
            graphics.draw_circle((self.position.x, self.position.y), 30.0, Color::RED);
        }
    }
}
