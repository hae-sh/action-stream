# action-stream

This is a GitHub Action that sends data from inside a CI/CD workflow to a [hae.sh](https://hae.sh/) stream.

## Note

This is a test only for staging.

## Usage

```yaml
jobs:
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - name: Send build to hae.sh
        uses: hae-sh/action-stream@v1
        with:
          haesh_stream_id: 01GRK8AX9S35CAYQVKVJ5ES6F4
          haesh_stream_header_name: ${{secrets.HAESH_STREAM_HEADER_NAME}}
          haesh_stream_header_value: ${{secrets.HAESH_STREAM_HEADER_VALUE}}
      - name: Deploy app
        # steps to deploy your app
```

This will send an updated row to your stream everytime the workflow runs. The row ID will be the `github.ref` value that triggered the run.

Here is an example row:

```json
{
  "ref": "refs/heads/main",
  "sha": "bd8f6d0017e681ce4ecf62ac9dcc3f03f15db8b5"
}
```

## Options

| Key                       | Required | Value  | Default | Description                                      |
| ------------------------- | -------- | ------ | ------- | ------------------------------------------------ |
| haesh_stream_id           | Yes      | String |         | The stream ID                                    |
| haesh_stream_header_name  | Yes      | String |         | The header name of the API key                   |
| haesh_stream_header_value | Yes      | String |         | The header value, i.e. the secret API key itself |
