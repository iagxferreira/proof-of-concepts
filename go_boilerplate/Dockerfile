# Build
FROM golang:1.23.0-alpine3.19 as build
RUN apk update
WORKDIR /app
COPY . /app/
RUN go mod download
RUN mkdir /app/build
RUN CGO_ENABLED=0 GOOS=linux go build -o api ./cmd/api

## Run the tests in the container
FROM build AS run-test-stage
RUN go test -v ./...

FROM gcr.io/distroless/base-debian11 AS run
COPY --from=build /app/api /api
EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/api"]