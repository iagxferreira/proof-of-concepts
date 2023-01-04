mod pendulum;
mod vector;
use pendulum::pendulum::Circle;
use pendulum::pendulum::MyWindowHandler;
use pendulum::pendulum::Pendulum;
use speedy2d::Window;
fn main() {
    let window: Window = Window::new_centered("Pendulum", (800, 480)).unwrap();
    let window_handler: MyWindowHandler = MyWindowHandler {
        pendulum: Pendulum::new(400.0, 0.0, 200.0),
        second_pendulum: Pendulum::new(400.0, 0.0, 400.0),
        circle: Circle::new(40.0, 20.0),
    };

    window.run_loop(window_handler);
}
