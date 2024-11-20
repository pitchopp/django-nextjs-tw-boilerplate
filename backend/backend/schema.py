from drf_spectacular.generators import SchemaGenerator

class HostAwareSchemaGenerator(SchemaGenerator):
    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)

        # Modify the server URLs to include the host
        if request:
            host = request.get_host()
            schema.servers = [
                {"url": f"https://{host}", "description": "API Server"}
            ]

        return schema
