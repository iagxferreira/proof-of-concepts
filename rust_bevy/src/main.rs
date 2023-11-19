use bevy::{math::*, prelude::*};

const PADDLE_START_Y: f32 = 0.0;
const PADDLE_SIZE: Vec2 = Vec2::new(120.0, 20.0);
const PADDLE_COLOR: Color = Color::rgb(0.3, 0.3, 0.7);
const PADDLE_SPEED: f32 = 500.0;

fn setup(mut commands: Commands) {
    commands.spawn(Camera2dBundle::default());
    commands.spawn((
        SpriteBundle {
            transform: Transform {
                translation: vec3(0., PADDLE_START_Y, 0.),
                ..default()
            },
            sprite: Sprite {
                color: PADDLE_COLOR,
                custom_size: Some(PADDLE_SIZE),
                ..default()
            },
            ..default()
        },
        Paddle,
    ));
}

fn move_paddle(
    input: Res<Input<KeyCode>>,
    time_step: Res<FixedTime>,
    mut query: Query<&mut Transform, With<Paddle>>,
) {
    let mut paddle_transform = query.single_mut();

    let mut horizontal_direction = 0.0;
    let mut vertical_direction = 0.0;
    if input.pressed(KeyCode::A) {
        horizontal_direction -= 1.0;
    }
    if input.pressed(KeyCode::D) {
        horizontal_direction += 1.0;
    }
    if input.pressed(KeyCode::W) {
        vertical_direction += 1.0;
    }

    if input.pressed(KeyCode::S) {
        vertical_direction -= 1.0;
    }

    let mut new_x = paddle_transform.translation.x
        + horizontal_direction * PADDLE_SPEED * time_step.period.as_secs_f32();
    let mut new_y = paddle_transform.translation.y
        + vertical_direction * PADDLE_SPEED * time_step.period.as_secs_f32();

    // new_x = new_x.min(RIGHT_WALL - (WALL_THICKNESS + PADDLE_SIZE.x) * 0.5);
    // new_x = new_x.max(LEFT_WALL + (WALL_THICKNESS + PADDLE_SIZE.x) * 0.5);

    paddle_transform.translation.x = new_x;
    paddle_transform.translation.y = new_y;
}

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .insert_resource(ClearColor(Color::rgb(0.9, 0.9, 0.9)))
        .add_systems(Update, bevy::window::close_on_esc)
        .add_systems(Startup, setup)
        .add_systems(FixedUpdate, move_paddle)
        .run();
}

#[derive(Component)]
struct Paddle;
